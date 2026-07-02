import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomerView from '@/views/CustomerView.vue'

function mockFetchResolving(data: unknown = []) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  })
}

describe('CustomerView', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should show a validation error when first name is empty', async () => {
    vi.stubGlobal('fetch', mockFetchResolving([]))
    const wrapper = mount(CustomerView)

    await wrapper.find('.section-header .btn-primary').trigger('click')
    await wrapper.find('.form-card .btn-primary').trigger('click')

    expect(wrapper.text()).toContain('First name is required.')
  })
})
