import {Theory} from '../../models'

test('creates a model', async () => {
  const theory = await Theory
    .query()
    .insertGraph({
      title: 'The title'
    })

  expect(theory.id).toBeDefined()
  expect(theory.title).toBe('The title')
})
