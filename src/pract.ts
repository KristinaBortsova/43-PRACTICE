// Тип аннотации — явное указание типов переменных
// Переменная id может хранить только числа
let id: number = 5;
// Переменная company может хранить только строки
let company: string = "Corporation";
// Переменная isPublished может хранить только true или false
let isPublished: boolean = true;
// Переменная tags — массив, содержащий только строки
let tags: string[] = ["TypeScript", "JavaScript"];

// any — отключает проверку типов, может хранить что угодно (строгость отключать не нужно — просто явное использование any)
let x: any = 10;

// Вывод всех переменных в консоль в виде объекта
console.log({ id, company, isPublished, tags, x });

//Интерфейсы и опциональные поля
// Описание структуры объекта User
interface User {
    id: number;    // Обязательное числовое поле
    name: string;  // Обязательное строковое поле
    age?: number;    // Опциональное поле (знак ? означает, что поле может отсутствовать)
    greet(message: string): void;  // Сигнатура метода: принимает строку, ничего не возвращает
}

// Создание объекта, соответствующего интерфейсу User
const user: User = {
    id: 1,  // Присваиваем числовой id
    name: "Kristina",  // Присваиваем строковое имя
    greet: (message: string) => console.log(message),  // Реализуем метод greet через стрелочную функцию
};

// Тернарный оператор: если age отсутствует — выводим сообщение, иначе выводим возраст
console.log(user.age === undefined ? "No age of the user" : user.age);

// Вызов метода greet у объекта user
user.greet("Hello from User.greet()");

// Типы функций: параметры и return type
// Функция принимает две строки и возвращает строку (склеивает через пробел)
function concatValues(a: string, b: string): string {
    return a + " " + b;  // Склеиваем строки с пробелом
}

// Вызов функции и вывод результата
console.log(concatValues("hello", "world"));

// Union (строка или число) + type alias 
// Создаём псевдоним типа: Id может быть строкой ИЛИ числом
type Id = string | number;

// Функция принимает параметр типа Id (строка или число) и выводит его
function printId(value: Id): void {
    console.log(`ID is equal to ${value}`);
}

printId("ID 123");   // Передаём строку — работает
printId(123);    // Передаём число — тоже работает


// Intersection (склейка двух интерфейсов)
// Интерфейс с деловыми данными
interface BusinessPartner {
    name: string;    // Имя партнёра
    creditScore: number;   // Кредитный рейтинг
}

// Интерфейс с идентификационными данными пользователя
interface UserIdentity {
    id: number;  // ID пользователя
    email: string;  // Email пользователя
}

// Intersection-тип: объединяем два интерфейса в один (должны присутствовать все поля из обоих)
type Employee = BusinessPartner & UserIdentity;

// Функция принимает объект типа Employee (склейка двух интерфейсов)
function signContract(employee: Employee): void {
    console.log(
        `Contract signed by ${employee.name}, email: ${employee.email}, creditScore: ${employee.creditScore}`
    );
}

// Вызов функции: передаём объект со всеми нужными полями
signContract({
    name: "Kristina",  // Поле из BusinessPartner
    creditScore: 800,  // Поле из BusinessPartner
    id: 23,  // Поле из UserIdentity
    email: "KristinaBortsova@gmail.com", // Поле из UserIdentity
});

// Enum — перечисление значений
// Создаём enum с возможными ошибками входа
enum LoginError {
    Unauthorized = "unauthorized", // Не авторизован
    NoUser = "no_user",   // Пользователь не найден
    WrongCredentials = "wrong_credentials",  // Неверные учётные данные
    Internal = "internal",  // Внутренняя ошибка
}

// Функция принимает значение из enum LoginError и выводит соответствующее сообщение
function printLoginErrorMessage(error: LoginError): void {
    switch (error) {   // Проверяем, какая именно ошибка пришла
        case LoginError.Unauthorized: // Если Unauthorized
            console.log("User not authorized");
            return;
        case LoginError.NoUser:  // Если NoUser
            console.log("No user was found with that username");
            return;
        case LoginError.WrongCredentials: // Если WrongCredentials
            console.log("Wrong credentials");
            return;
        default:   // Все остальные случаи (Internal)
            console.log("Internal error");
            return;
    }
}

printLoginErrorMessage(LoginError.Unauthorized);
printLoginErrorMessage(LoginError.NoUser);
printLoginErrorMessage(LoginError.WrongCredentials);
printLoginErrorMessage(LoginError.Internal);

// Generics — обобщённый класс
// Класс с обобщённым типом T (может работать с любым типом данных)
class StorageContainer<T> {
    // Приватное поле — массив элементов типа T
    private contents: T[] = [];

    // Метод добавления элемента в контейнер
    addItem(item: T): void {
        this.contents.push(item); // Добавляем элемент в массив
    }

    // Метод получения элемента по индексу (может вернуть undefined)
    getItem(index: number): T | undefined {
        return this.contents[index];  // Возвращаем элемент или undefined
    }
}

// Создаём экземпляр контейнера, который будет хранить строки
const usernames = new StorageContainer<string>();
usernames.addItem("Kristina"); // Добавляем первую строку
usernames.addItem("Echo BR");  // Добавляем вторую строку
console.log(usernames.getItem(0));  // Получаем элемент по индексу 0

// Создаём экземпляр контейнера, который будет хранить числа
const friendCounts = new StorageContainer<number>();
friendCounts.addItem(23);  // Добавляем первое число
friendCounts.addItem(56);   // Добавляем второе число
console.log(friendCounts.getItem(1)); // Получаем элемент по индексу 1

// Readonly — поля только для чтения
// Интерфейс с полями, доступными только для чтения
interface EmployeeReadOnly {
    readonly employeeId: number;   // Нельзя изменить после создания объекта
    name: string;     // Обычное поле, можно изменять
    readonly startDate: Date;  // Нельзя изменить после создания объекта
    department: string;  // Обычное поле, можно изменять
}

// Создаём объект с readonly полям
const emp: EmployeeReadOnly = {
    employeeId: 1,   // Присваиваем readonly-полю начальное значение
    name: "Kristina",  // Присваиваем обычному полю значение
    startDate: new Date(),  // Присваиваем readonly-полю текущую дату
    department: "Programming",  // Присваиваем обычному полю значение
};

emp.name = "Jessica"; // Можно: name — обычное поле
// emp.employeeId = 2; // Нельзя: employeeId is readonly
console.log(emp); // Выводим объект в консоль