import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import Calendar from '@/components/Calendar'
describe('Calendar', () => {
  const wrapper = shallow(Calendar)
  it('renders correct contents', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
