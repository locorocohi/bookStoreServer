import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cover: string

    @Column()
    author: string

    @Column()
    name: string

    @Column()
    genre: string

    @Column()
    rating: number

    @Column()
    price: number
}