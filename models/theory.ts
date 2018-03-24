export function defineTheory ({Model}) {
  return class Theory extends Model {
    static tableName = 'theories'
  }
}