import * as Knex from 'knex'
import {Model} from 'objection'

import * as knexfile from '../knexfile'
import defineTheory from './theory'
import defineUser from './user'

const knex = Knex(knexfile[process.env.NODE_ENV])

Model.knex(knex)

export const Theory = defineTheory({Model})
export const User = defineUser({Model})
