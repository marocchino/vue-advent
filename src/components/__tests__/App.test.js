import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import App from '@/components/App'
describe('App', () => {
  const wrapper = shallow(App)
  it('renders correct contents', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
