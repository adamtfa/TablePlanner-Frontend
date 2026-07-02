import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ReservationView from '@/views/ReservationView.vue'

function mockFetchResolving(data: unknown = []) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  })
}

describe('ReservationView', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should show validation errors when no customer or table is selected', async () => {
    vi.stubGlobal('fetch', mockFetchResolving([]))
    const wrapper = mount(ReservationView)

    await wrapper.find('.section-header .btn-primary').trigger('click')
    await wrapper.find('.form-card .btn-primary').trigger('click')

    expect(wrapper.text()).toContain('Please select a customer.')
    expect(wrapper.text()).toContain('Please select a table.')
  })

  it('should show a validation error when the date is in the past', async () => {
    vi.stubGlobal('fetch', mockFetchResolving([]))
    const wrapper = mount(ReservationView)

    await wrapper.find('.section-header .btn-primary').trigger('click')
    await wrapper.find('input[type="date"]').setValue('2020-01-01')
    await wrapper.find('.form-card .btn-primary').trigger('click')

    expect(wrapper.text()).toContain('Date cannot be in the past.')
  })
})
