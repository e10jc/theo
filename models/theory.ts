export function defineTheory ({Model}) {
  return class Theory extends Model {
    static tableName = 'theories'

    static jsonSchema = {
      type: 'object',
      properties: {
        id: {type: 'integer'},
        title: {type: 'string'}
      }
    }
  }
}