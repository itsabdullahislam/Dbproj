import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import "reflect-metadata"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string
   
    @Column()
    email: string
    @Column()
    password: string

    @Column()
    age: number

    @Column()
    nic: number
    @Column()
    contact: number

    @Column()
    adress: string

    @Column()
    gender: string
}
