import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'calculations',
  createdAt: false,
  updatedAt: false,
})

export class Calculation extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
    field: 'entered_value',
  })
  enteredValue: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  })
  medians: number[];
}
