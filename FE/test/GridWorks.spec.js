import { mount } from '@vue/test-utils'
import WorksGrid from '@/components/WorksGrid.vue'

describe('GridWorks', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(WorksGrid)
    expect(wrapper.vm).toBeTruthy()
  })

  test('displays work', () => {
    // mount() returns a wrapped Vue component we can interact with
    const wrapper = mount(WorksGrid, {
      propsData: {
        works: [{
          title: 'worktitle',
          single_image:{
            formats:{
              small:{
                url:'testurl'
              }
            }
          }
        }]
      }
    })

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('worktitle')
  })
})
