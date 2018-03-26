export function defineTheory ({Model}) {
  return class Theory extends Model {
    public static tableName = 'theories'

    public static jsonSchema = {
      properties: {
        id: {type: 'integer'},
        title: {type: 'string'}
      },
      type: 'object',
    }
  }
}
