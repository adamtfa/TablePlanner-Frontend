import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import TableView from '@/views/TableView.vue'

function mockFetchResolving(data: unknown = []) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  })
}

describe('TableView', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should show a validation error when table number is empty', async () => {
    vi.stubGlobal('fetch', mockFetchResolving([]))
    const wrapper = mount(TableView)

    await wrapper.find('.section-header .btn-primary').trigger('click')
    await wrapper.find('.form-card .btn-primary').trigger('click')

    expect(wrapper.text()).toContain('Table number is required.')
  })

  it('should show a validation error when table number is not positive', async () => {
    vi.stubGlobal('fetch', mockFetchResolving([]))
    const wrapper = mount(TableView)

    await wrapper.find('.section-header .btn-primary').trigger('click')
    await wrapper.find('input[placeholder="Table number"]').setValue('-1')
    await wrapper.find('input[placeholder="Capacity (max. 8)"]').setValue('4')
    await wrapper.find('.form-card .btn-primary').trigger('click')

    expect(wrapper.text()).toContain('Table number must be a positive number.')
  })

  it('should load and display tables returned by the backend', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetchResolving([{ id: 1, tableNumber: 5, capacity: 4, available: true }]),
    )

    const wrapper = mount(TableView)
    await flushPromises()

    expect(wrapper.text()).toContain('Table number 5')
    expect(wrapper.text()).toContain('Capacity: 4')
  })

  it('should send a POST request with the entered data when saving a new table', async () => {
    const fetchMock = mockFetchResolving({ id: 1, tableNumber: 7, capacity: 2, available: false })
    vi.stubGlobal('fetch', fetchMock)

    const wrapper = mount(TableView)
    await wrapper.find('.section-header .btn-primary').trigger('click')
    await wrapper.find('input[placeholder="Table number"]').setValue('7')
    await wrapper.find('input[placeholder="Capacity (max. 8)"]').setValue('2')
    await wrapper.find('.form-card .btn-primary').trigger('click')
    await flushPromises()

    const postCall = fetchMock.mock.calls.find(([, options]) => options.method === 'POST')
    expect(postCall).toBeDefined()

    const [, options] = postCall as [string, RequestInit]
    expect(JSON.parse(options.body as string)).toMatchObject({ tableNumber: '7', capacity: '2' })
  })
})
