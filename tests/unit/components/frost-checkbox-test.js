const expect = chai.expect

import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-checkbox',
  'FrostCheckboxComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    describe('.inputId', function () {
      beforeEach(function () {
        Ember.run(() => {
          component.set('id', 'test')
        })
      })

      it('returns correct value', function () {
        expect(component.get('inputId')).to.equal('test_input')
      })
    })
  }
)
