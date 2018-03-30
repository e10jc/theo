import * as BCrypt from 'bcrypt'

const createPasswordHash = async password => BCrypt.hash(password, 10)

export default function ({Model}) {
  return class User extends Model {
    public static tableName = 'users'

    public static jsonSchema = {
      properties: {
        id: {type: 'integer'}
      },
      required: ['email', 'password'],
      type: 'object',
    }

    public async $beforeInsert () {
      this.password = await createPasswordHash(this.password)
    }
  }
}
