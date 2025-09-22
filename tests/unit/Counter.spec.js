import { mount } from '@vue/test-utils'
import Counter from "@/components/Counter.vue"

describe('Counter.vue', () => {
  test('отображает начальное состояние счетчика', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('h2').text()).toContain('Счетчик: 0');
  })

  test('увеличивает счетчик при клике на кнопку +', async () => {
    const wrapper = mount(Counter)
    const incrementButton = wrapper.find('.btn-increment')
    
    await incrementButton.trigger('click')
    expect(wrapper.vm.count).toBe(1)
    expect(wrapper.find('h2').text()).toContain('Счетчик: 1')
  })

  test('уменьшает счетчик при клике на кнопку -', async () => {
    const wrapper = mount(Counter)
    const decrementButton = wrapper.find('.btn-decrement')
    
    await decrementButton.trigger('click')
    expect(wrapper.vm.count).toBe(-1)
    expect(wrapper.find('h2').text()).toContain('Счетчик: -1')
  })

  test('сбрасывает счетчик при клике на кнопку Сбросить', async () => {
    const wrapper = mount(Counter)
    
    // Сначала увеличиваем счетчик
    await wrapper.find('.btn-increment').trigger('click')
    await wrapper.find('.btn-increment').trigger('click')
    expect(wrapper.vm.count).toBe(2)
    
    // Затем сбрасываем
    await wrapper.find('.btn-reset').trigger('click')
    expect(wrapper.vm.count).toBe(0)
    expect(wrapper.find('h2').text()).toContain('Счетчик: 0')
  })

  test('корректно обрабатывает несколько операций подряд', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('.btn-increment').trigger('click')
    await wrapper.find('.btn-increment').trigger('click')
    await wrapper.find('.btn-decrement').trigger('click')
    await wrapper.find('.btn-reset').trigger('click')
    await wrapper.find('.btn-increment').trigger('click')
    
    expect(wrapper.vm.count).toBe(1)
    expect(wrapper.find('h2').text()).toContain('Счетчик: 1')
  })

  test('эмитирует события при изменении счетчика', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('.btn-increment').trigger('click')
    expect(wrapper.emitted().incremented).toBeTruthy()
    expect(wrapper.emitted().incremented[0]).toEqual([1])
    
    await wrapper.find('.btn-decrement').trigger('click')
    expect(wrapper.emitted().decremented).toBeTruthy()
    expect(wrapper.emitted().decremented[0]).toEqual([0])
    
    await wrapper.find('.btn-reset').trigger('click')
    expect(wrapper.emitted().reset).toBeTruthy()
    expect(wrapper.emitted().reset[0]).toEqual([0])
  })

  test('содержит все необходимые элементы структуры DOM', () => {
    const wrapper = mount(Counter)
    
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('.btn-increment').exists()).toBe(true)
    expect(wrapper.find('.btn-decrement').exists()).toBe(true)
    expect(wrapper.find('.btn-reset').exists()).toBe(true)
    
    expect(wrapper.find('.btn-increment').text()).toBe('+')
    expect(wrapper.find('.btn-decrement').text()).toBe('-')
    expect(wrapper.find('.btn-reset').text()).toBe('Сбросить')
  })
});

