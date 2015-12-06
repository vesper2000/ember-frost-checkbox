import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		checked(attrs) {
			this.notifications.addNotification({
				message: '' + attrs.value,
				type: 'success',
				autoClear: true,
				clearDuration: 2000
			});
		},
		value(attrs) {
			this.notifications.addNotification({
				message: attrs.id + ' - ' + attrs.value,
				type: 'success',
				autoClear: true,
				clearDuration: 2000
			});
		},
		tabSelected(tab) {
			this.set('selectedTab', tab);
		}
	}
});
