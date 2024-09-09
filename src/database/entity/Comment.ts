import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User"
import { Book } from "./Book"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    text: string
    
    @Column()
    creationTime: string
  
    @ManyToOne(() => Book, (book) => book.comments)
    book: Book

    @ManyToOne(() => User, (user) => user.comments)
    author: User
}