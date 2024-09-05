import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn } from "typeorm"
import { Comment } from "./Comment"
import { User } from "./User"

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

    @Column({type: 'float'})
    rating: number

    @Column()
    price: number

    @Column()
    available: boolean

    @Column()
    description: string

    @OneToMany(() => Comment, (coment) => coment.book, {
        onDelete: 'CASCADE'
    })
    comments: Comment[]

    @ManyToMany(() => User, (user) => user.books)
    users: User[]
}