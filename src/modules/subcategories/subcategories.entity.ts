import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";

@Entity('sub-categories')

export class SubCategories{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

     @Column({ type: 'varchar', length: 255, unique: true })
    slug: string;

    @ManyToOne(() => Categories)
    @JoinTable({name: 'Categorg_id'})
    category: Categories

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({type: 'int', nullable: true})
    created_by: number;

    @Column({type: 'int', nullable: true})
    updated_by: number;


}