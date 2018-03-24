import {Theory} from '../../models'

test('it works', async () => {
  const theory = await Theory.query().insertGraph({
    title: 'The title'
  })

  expect(theory.id).toBeDefined()
  expect(theory.title).toBe('The title')
})