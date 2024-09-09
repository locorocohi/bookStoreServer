import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm"
import { Comment } from "./Comment"
import { Book } from "./Book"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatar: string

    @Column()
    name: string

    @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
    comments: Comment[]

    @ManyToMany(() => Book, (book)=> book.users)
    @JoinTable()
    books: Book[]
}
