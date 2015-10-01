/* globals module */
/* jshint node: true */

'use strict';

var Funnel = require('broccoli-funnel');

var fs = require('fs');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');
var reexport = require('ember-cli/lib/utilities/reexport');

module.exports = {
	name: 'frost-checkbox',

	// Override the addon tree to process addon SCSS - see https://github.com/ember-cli/ember-cli/issues/4463
	treeForAddon: function(tree) {
		// Default addon build process
		this._requireBuildPackages();

		if (!tree) {
			return tree;
		}

		var addonJs = this.preprocessJs(this.addonJsFiles(tree), '/', this.name, {
			registry: this.registry
		});
		var templatesTree = this.compileTemplates(tree);
		var reexported = reexport(this.name, this.name + '.js');
		var trees = [addonJs, templatesTree, reexported].filter(Boolean);

		var addonTree = mergeTrees(trees);

		// Extract the addon CSS tree from the default addon build process
		var addonRootStylesTree = new Funnel(path.join(this.root, 'addon', 'styles'), {
			destDir: '/'
		});
		var addonStylesTree = addonRootStylesTree;

		// Join in addon components styles if present
		var addonComponentsPath = path.join(this.root, 'addon', 'pods', 'components');
		try {
			fs.statSync(addonComponentsPath);
			var addonPodStylesTree = new Funnel(addonComponentsPath, {
				include: ['**/*.scss'],
				destDir: '/'
			});
			addonStylesTree = mergeTrees([addonRootStylesTree, addonPodStylesTree]);
		} catch (err) {
			// The tree doesn't exist, nothing to do
		}

		// Merge the addon CSS tree with the bourbon and core CSS trees
		var bourbonPath = path.join('bower_components', 'bourbon', 'app', 'assets');
		var bourbonTree = new Funnel(this.treeGenerator(bourbonPath), {
			srcDir: '/stylesheets',
			destDir: '/'
		});

		var corePath = path.join('node_modules', 'frost-css', 'addon');
		var coreTree = new Funnel(this.treeGenerator(corePath), {
			srcDir: '/styles',
			destDir: '/'
		});

		var mergedStylesTree = mergeTrees([bourbonTree, coreTree, addonStylesTree]);

		// Compile the merge styles tree
		var stylesTree = this.compileStyles(mergedStylesTree);

		return mergeTrees([addonTree, stylesTree].filter(Boolean));
	}
};
