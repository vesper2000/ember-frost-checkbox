/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'frost-checkbox',
  'Integration: FrostCheckboxComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-checkbox}}
      //     template content
      //   {{/frost-checkbox}}
      // `);

      this.render(hbs`{{frost-checkbox}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
