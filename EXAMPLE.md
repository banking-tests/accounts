# Example

```ts
// src/modules/todos/domain/enums/todo-status.enum.ts
export enum TodoStatus {
    CREATED = 'created',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}
```

```ts
// src/modules/todos/domain/interfaces/todo.interface.ts
export interface Todo extends ResourceProps {
    title: string;
    description: string;
    status: TodoStatus;
    dueDate: Date;
}
```

```ts
// src/modules/todos/domain/entities/
export class TodoEntity extends ResourceEntity<Todo> {
    protected _title: string;
    protected _description: string;
    protected _dueDate: Date;
    protected _status: TodoStatus;

    constructor(data: Todo) {
        super(data);
        this._title = data.title;
        this._description = data.description;
        this._dueDate = data.dueDate;
        this._status = data.status;
    }

    public static create(data: Todo): TodoEntity {
        return new TodoEntity(data);
    }

    public isCompleted(): boolean {
        return this._status === TodoStatus.COMPLETED
    }

    public complete(): void {
        if (this.isCompleted()) {
            throw Error("Already completed");
        }

        this._status = TodoStatus.COMPLETED;
    }

    // ... more bussiness logic methods

    public toObject(): Todo {
        return {
            title: this._title,
            description: this._description,
            dueDate: this._dueDate,
            status: this._status
        }
    }
}
```

```ts
// src/modules/todos/infrastructure/persistence/database/models
@Schema({ collection: 'todos', timestamps: true, autoIndex: true })
export class TodoModel extends ResourceDocument {
    @Prop({ type: String })
    public title: string;

    @Prop({ type: String })
    public description: string;

    @Prop({ type: Date })
    public dueDate: Date;

    @Prop({ type: String })
    public status: TodoStatus;
}
```

```ts
// src/modules/todos/infrastructure/persistence/database/repositories/todos.repository.ts
@Repository()
export class TodosRepository extends BaseRepository<Todo, TodoEntity> {
  constructor(
    @InjectModel(TodoModel.name)
    private readonly todoModel: PaginateModel<TodoModel>,
  ) {
    super(todoModel, TodoEntity);
  }
}
```

```ts
// src/modules/todos/infrastructure/persistence/memory/repositories/todos.repository.ts
import DataStore = require('nedb-promises');

@Repository()
export class TodosMemoryRepository extends BaseMemoryRepository<Todo, TodoEntity> {
  constructor() {
    // Or you can inject the data store in the module definition
    super(DataStore.create(), TodoEntity, { softDelete: true });
  }
}
```

```ts
// src/modules/todos/infrastructure/persistence/services/todos.service.ts
@Service()
export class TodosService extends BaseService<Todo, TodoEntity> {
  constructor(
    @InjectRepository('TodosRepository')
    private readonly todosRepository: BaseRepository<Todo, TodoEntity>,
  ) {
    super(todosRepository);
  }
}
```

```ts
// src/modules/todos/application/use-cases/create-todo.use-case.ts
@UseCase()
export class CreateTodoUseCase implements Executable {
    constructor(
        @InjectService(TODOS_SERVICE)
        public readonly todosService: TodosService,
    ) {}

    public async execute(context: Context, payload: TodoPlainPayload): Promise<Todo> {
        const todo = await this.todosService.create(payload);

        if (!todo) {
            throw new Error()
        }

        return todo.toObject()
    }
}
```