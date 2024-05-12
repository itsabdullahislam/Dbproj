import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import "reflect-metadata"

@Entity()
export class Technician {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string
   
    @Column()
    email: string
    @Column()
    qualification: string

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

    @Column()
    available: string

    @Column()
    location: string
}
