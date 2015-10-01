import Ember from "ember";
import layout from "./template";
import _ from "lodash/lodash";

export default Ember.Component.extend({
	layout: layout,
	classNames: ["frost-checkbox"],

	checked: false,

	onclick: Ember.on("click", function(event) {
		if (!Ember.ViewUtils.isSimpleClick(event)) {
			return true;
		}

		event.preventDefault();
		event.stopPropagation();

		let checked = this.toggleProperty("checked");

		if (_.isFunction(this.attrs["on-input"])) {
			let id = this.get("value");
			this.attrs["on-input"]({id: Ember.isEmpty(id) ? this.get("id") : id, value: checked});
		}
	})
});
