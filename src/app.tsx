import { Combobox } from '@headlessui/react'
import {
  CheckIcon as CheckMarkIcon,
  ChevronUpDownIcon as SelectorIcon,
} from '@heroicons/react/20/solid'
import { ChangeEvent, Fragment, useState } from 'react'

type Item = {
  id: string
  label: string
}

const items: Array<Item> = [
  { id: 'apple', label: 'Apple' },
  { id: 'avocado', label: 'Avocado' },
  { id: 'banana', label: 'Banana' },
  { id: 'fig', label: 'Fig' },
  { id: 'lemon', label: 'Lemon' },
  { id: 'orange', label: 'Orange' },
]

export function App() {
  const [selectedIds, setSelectedIds] = useState<Array<Item['id']>>([])
  const [searchTerm, setSearchTerm] = useState('')

  function onSelectionChange(ids: Array<Item['id']>) {
    setSelectedIds(ids)
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean)
  const filteredItems =
    searchTerm === ''
      ? items
      : items.filter((item) => {
          return searchTerms.some((searchTerm) => item.label.toLowerCase().includes(searchTerm))
        })

  return (
    <main className="max-w-6xl mx-auto p-8 grid gap-8">
      <h1 className="text-3xl font-bold">Test</h1>
      <div className="max-w-xl p-4 shadow-xl rounded-md bg-neutral-0">
        <Combobox
          as="div"
          className="relative grid gap-2"
          multiple
          onChange={onSelectionChange}
          value={selectedIds}
        >
          <div className="grid gap-1">
            <Combobox.Label className="text-sm font-medium text-neutral-700">Label</Combobox.Label>
            <div className="relative grid">
              <Combobox.Input
                autoComplete="off"
                className="pl-3 pr-8 py-1.5 border border-neutral-200 rounded bg-neutral-0"
                onBlur={() => setSearchTerm('')}
                onChange={onInputChange}
                value={searchTerm}
              />
              <Combobox.Button className="absolute right-2 inset-y-0">
                <SelectorIcon aria-hidden className="h-5 w-5" />
              </Combobox.Button>
            </div>
          </div>
          <Combobox.Options>
            {filteredItems.map((item) => {
              return (
                <Combobox.Option
                  key={item.id}
                  className="text-sm px-2.5 py-2 flex items-center justify-between ui-active:bg-neutral-100 ui-selected:font-medium rounded"
                  value={item.id}
                >
                  {({ selected }) => {
                    return (
                      <Fragment>
                        {item.label}
                        {selected ? (
                          <span>
                            <CheckMarkIcon aria-hidden className="h-4 w-4" />
                          </span>
                        ) : null}
                      </Fragment>
                    )
                  }}
                </Combobox.Option>
              )
            })}
          </Combobox.Options>
        </Combobox>
      </div>
    </main>
  )
}
