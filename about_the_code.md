# Code Design & Standards

Aside from what linter checks, in this document we'll be dicussing about the notations, keywords, and other standards that should be observed when working with this code.

## Section 1: Server Code Structure

### 1.1 Modules

The server side of the application is divided into `modules`. Each module contains one or more domain models, and possibly web, service, and persistence code.

Modules generally look like this:

```
─ src
  ├─ Employees //  The module, same name as main domain
  |  ├─ module.js //  The meta data/configuration, fixed name, small case.
  |  ├─ Employees.js // Domain Model, singular
  |  ├─ Web
  |  |  ├─ EmployeesRoutes.js
  |  |  └─ EmployeesController.js
  |  |
  |  ├─ Services
  |  |  └─ EmployeeSynchronizer.js
  |  |
  |  └─ Persistence
  |     └─ EmployeesModel.js // Mongo, SQL, etc db model, plural
  |
  ├─ Tasks  // Another module
  |  ├─ TaskTag.js
  |  └─ Task.js  
  |
  └─ Worklogs // Another module
     ├─ WorklogDay.js   //  There can be multiple domain models
     └─ Worklog.js 

        ... and so on
```

|Module Part|Remarks|
|-|-|
|Domain Model|See [reference](https://en.wikipedia.org/wiki/Domain_model). Domain Models are the heart of each modules. Each module is not restricted to just one domain model, there can be several as long as they are __closely__ related. See sample below about Tasks and Task Tags.|
|Web|Anything that has to do with http operations. This will include the setup to routing or controllers that dispatch operations to the domain model(s)|
|Web.Routes|Should be the standard script to contain the mapping of web routes to controller functions|
|Web.Controllers|These dispatch operations to either the services, the model, or sometimes, the persistence's models directly.|
|Services|These are larger operations to a domain model that can't exactly be considered as a behavior of that domain. For example, synchronizing employees from Helium to Worklogs is an operation that creates|
|Persistence|Models that communicate directly with the database.|

A module can contain 1 or more domain models, persistence models, __and/or__ web controllers & routes. Note the __and/or__ in that. A module can still be considered one even if it does not have web, service or persistence scripts.

### 1.2 Related Modules

Ideally, scripts inside a module should communicate only with each other. But in case of overlapping modules or modules that are related to each other (ex. a worklog contains 1 task and 1 project), then __try to limit the access to domain model to domain model or services only__.

One good example may be this:

```
 Worklog
  ├─ Employee
  ├─ Task 
  └─ Project

```

A worklog contains a project, a task, and the employee that wrote the worklog. 

__TODO: Elaborate on this__

## Section 2: Naming Things (Server)

### 2.1 CRUD Verbs

Consistency of usage of the following must be observed:

|Verb|Remarks|
|-|-|
|Show|To display a human readable (most likely designed with css) representation of a piece of information (an employee, a project, etc.). Ex. `show-employee` is very likely a `data-action` attribute of a link to a page that displays a certain employee. It could also be a `show()` function inside a controller of a certain resource.|
|Get|To get the raw data (most likely JSON) representation of a piece of information. Ex. a `get()` function inside the `EmployeeController` class is likely to return a JSON representation of the employee while `show()` function will instead return the page in HTML format.|
|Create|Used usually to initiate the creation of something, but NOT the actual storage to the persistence/database. Example, a button to redirect to a form (an `<a>` tag) may be called `create-worklog` but the button to actually store it is `store-worklog`|
|Store|This means to actually store something to the persistence layer. Ex. a `store-worklog` `data-action` attribute of a button or a `store()` function in the `WorklogController`.|
|Edit|Same as `Create` but for modifying existing records. Usually used for links and showing pages to edit a certain record.
|Update|Same as `Store` but for saving changes to existing records.
|Save|Save is used when the `Store` and `Update` can be combined into one. You can occassionally find this more on the frontend source code but can seldom be on the server code too.|
|Delete|Delete a record from the database/persistence|

### Resource Controllers & Routes

Below is a demonstration on how to write a resource controller and the corresponding routes each function should represent

```js
class UsersController {
    //  @get: /users
    showList() {

    }

    //  @get: /api/v1/users
    getList() {

    }

    //  @get: /users/{id}
    show(id) {

    }

    //  @get: /api/v1/users
    get(id) {

    }

    //  @get: /users/create
    create() {

    }

    //  @post: /api/v1/users
    store() {

    }

    //  @get: /users/{id}/edit
    edit(id) {

    }

    //  @put: /api/v1/users/{id}
    update(id) {

    }

    //  @delete: /api/v1/users/{id}
    delete(id) {

    }
}
```

Notice that we use `UsersController`, we will use __plural nouns__  in CamelCase for controller names. This is to reflect the routing names:

|Ex. Route|Remarks|
|-|-|
|/users|Getting all users|
|/users?page=1|Getting users|
|/users/9asdhf28|Getting one user with id 9asdhf28|

Routes should be plural in general.

### Controllers With Encapsulated Actions

This is preferred more than resource controllers. Resource controllers "expose" functionality to the frontend and allow it to do updates at its own discretion which we should generally avoid. Of course, it's still needed in many cases especially for very simple resources, but if there's a behavior or business rule involved, avoid exposing ALL the CRUD operations.

Encapsulated actions are actions that hide it's internal implementation, for example:

```js
//  Domain Model
class Spaceship {
    _gas = 100; // percent

    fly() {
        this._assertHasGas();
        this._gas--;
    }

    _assertHasGas() {
        if (this._gas <= 0) {
            throw new OutOfGasError();
        }
    }

    getRemainingGas() {
        return this._gas;
    }
}

class SpaceshipsController {    

    //  @post: /api/v1/spaceships/1/fly
    fly(id) {
        const spaceship = this.spaceshipModel.findById(id);
        spaceship.fly();
        return {
            remaingGas: spaceship.remaingGas();
        }
    }
}

```

### 3.2 Formats & Casing

For JSON stuff, we'll generally follow what [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml?showone=Property_Name_Format#Property_Name_Format) says. We'll refer to this as `GJSG` from now on to make it short.

|Case|Parts|
|-|-|
|__CamelCase__| Folders & Class Names |
|__camelBack__| Properties of a class or a JSON object (as mentioned in the `GJSG`) |
|___underscorePrefixCamelBack__| Anything (pseudo) private to a class or class object. A JSON (only) object MUST never have such properties especially if used as a response to an API request. |
|__ALL_CAPS_SNAKE_CASE__| Constants, enum values, etc. |

### Naming & Casing Examples

#### Class demonstrating `CamelCase`, `camelBack`, and `_underscorePrefixCamelBack` usage:

```js
class Foo {
    publicProp = 'nice';
    _privateProp = 'noice';

    _privateFn() {
        return 'does something';
    }

    publicFn() {
        const aVariable = 'does another thing';
        return aVariable;
    }
}
```

#### Constants, Class Constants, & Enums:

```js

const REGULAR_CONSTANT = "I can't mutate";

class Foo {
    //  stuff going on here
}

Foo.BAR = "I'm a class constant";
Foo.ANOTHER_BAR = "I'm also a class constant";
```

```js

```

## Section 3: Miscellaneous

### 3.1 Variables

We will prefer constants (`const`) variables in general and only use `let` if we can't avoid mutation. For objects that have their properties mutated, let's opt to use `let` instead of `const` regardless.

```diff
- BAD!
```

```js
let isSomethingTrue = condition1 && condition2;
if (isSomethingTrue) {
    //  do stuff
}
```

```diff 
+ GOOD!
```

```js
const aRegularVariable = 'something here';
const aReadonlyObject = { foo: 'bar' };

//  We can technically still use const here, but we wont.
//  We'll use let to tell the reader/other devs that this
//  variable or a part of it can mutate.
let objectWithMutatableProps = { foo: 'bar' };

objectWithMutatableProps.foo = '+bar';
objectWithMutatableProps = { foo: 'can be mutated as a whole since it\'s declared as let' }
```

Since we're using the variable `isSomethingTrue` to simplify a set of conditions and thus only read from it, it's bad that it's declared as `let`. Remember that in the source code, when something is declared as `let`, it means it's mutated somewhere *the same scope*.

### 3.2 General Do's & Don'ts

3.2.1 Treat function parameters as constants

```diff 
- BAD!
```

```js
const doSomething = (param1) => {
    const isSomethingTrue = testIfSomethingIsTrue();
    if (isSomethingTrue) {
        //  mutated a parameter to overwrite the behavior below
        param1 = 'mutate a param';
    }

    if (param1 === 'a test') {
        //  do something
    }
}; 

```

Instead, you can do:

```diff 
+ GOOD!
```

```js
const doSomething = (param1) => {
    const isSomethingTrue = param1 === 'a test' && testIfSomethingIsTrue();

    if (isSomethingTrue) {
        //  do something
    }
}; 
```

Note that we should be able to __warn__ other developers that a certain variable or a property of it in case of objects, can mutate by declaring it with `let` and we can't do that with parameters. Besides, consensus is it's generally considered bad practice to do so anyway.

## Section 4: React Code (TODO)

## Section 5: Naming Things (React)

### 5.1 React Component Function Names

Note that in react components, we don't make use of underscore prefixes as technically, there's no public properties and methods of react components. When a component is used, you can only display the markup and do some __inversion of control__ using callbacks passed as props.

An imporant thing to be consistent on though, is the use of "`on`" and "`trigger`" prefixes on component functions.

Consider the following component:

```jsx
class RestaurantForm extends React.Component {
    state = { name: '' }

    render() {
        const { name } = this.state;

        return (
            <div className="restaurant-form">
                <input
                    value={name}
                    onChange={this.syncState}
                    name="name"
                    type="text" />

                <button
                    onClick={this.triggerOnSave}
                    data-action="save">
                    Create Restaurant
                </button>
            </div>
        );
    }

    syncState = (event) => {
        const { value } = event.target;
        this.setState({ name: value });
    }

    triggerOnSave = () => {
        const { onSave } = this.props;
        onSave && onSave(this.getRestaurant());
    }

    getRestaurant() {
        const { name } = this.state;
        return {
            name,
        };
    } 
}
```

The component above is tested like so:

```jsx
const onSaveHandler = jest.fn();
const wrapper = mount(<RestaurantForm onSave={onSaveHandler} />);

wrapper
    .find('[name="name"]')
    .simulate('change', { target: { value: 'Seafood Island' } });

wrapper
    .find('[data-action="save"]')
    .simulate('click');

expect(onSaveHandler)
    .toHaveBeenCalledWith({ name: 'Seafood Island' });
```

Take note of the following functions:

- `syncState()`
- `onSave()` (passed through props)
- `triggerOnSave()`

__#Component Function Prefixes__

Now you should notice that "`on`" functions are used to listen to events that happen *inside* this component which happens when you type on the text field, click on a button, or listen to the component itself (like in this example) etc.

While the "`trigger`" prefix are functions that trigger callbacks that are passed from the *outside* of the component. Separating it this way, we can call multiple `on` command functions that make use of the same "`trigger`" function, additionally, it's now safe to call it since testing of whether an `onSave` callback was passed in to the props of this component is done centrally in the `trigger` function.

A good guideline can be:

- If there's an `onSave` (passed through props), you bet there will be a `triggerOnSave` inside the component. (`onSomething` > `triggerOnSomething`).
- `on` = inside, `trigger` = outside.

__#Encapsulation of Components__

You need to expose only the things that are considered *"finished products"* in your components. In this case, considering the code:

```jsx
<RestaurantForm onSave={onSaveHandler} />
```

... we are limiting the user of the `RestaurantForm` component to only be able to get the details of the restaurant upon saving. We do not, and must not, expose things like on change of a component unless that change results to a *"finished product"*, which, in this case, is a full `restaurant` object with a `name` property.

### 5.2 React Component Function Order

You should notice by now that we are following [*"newspaper code structure"*](https://kentcdodds.com/blog/newspaper-code-structure) in ordering our functions. The function `render()` came before the other *"event listener"* and *"trigger"* functions.

> *Your code should read like a newspaper article. Important stuff at the top, details at the bottom.*

In this case, the important part, which is also the "summary" is the `render()` function or our markup. The other details about it will just follow, we are only usually interested on the markup, and when we want to find more about the component, then that's when we scroll down to __*see the details*__.

*Just like a news paper, the first thing you see is a one paragraph summary of the article, then in the next paragraphs, you can read about the details of that article.*

*It should also feel like just reading the "summary" (in this case the `render()`) is enough to know about the whole code.*

The statements above are also made possible because we named our functions carefully. For example, the `name` text field calls the `syncState()` when the `onChange` callback is invoked, this is now pretty self explanatory. In this example, when name is changed, sync it to the state; this is the "summary", if the developer wants to know how the state is changed, he will scroll down to the `syncState()` function, this is the details. 

*Again, summary first, then details, but to make this successful, carefully name your functions so that scrolling down wont even be necessary in most cases.*