const { _fetchData } = require('ethers/lib/utils');
const sum = require('./sandbox');

let count = 1;
// note that these tests will ALL interact with the variable



beforeAll(() => {
    count = 1
    // runs only once
    // can also do afterAll()

    //good for when you are trying to set up a connection to the DB
})

//SCOPING, adds clarity with describe blocks:
// can scope set ups and tear downs as well
describe('test numbers', () => {
    beforeEach(() => {
        count = 1
        // resets count to 1 before each test
        // can also do afterEach()
    })

    test('should return the sum of a and b', () => {
        expect(sum(2, 2)).toBe(4);
    })
    
    test('should return a message thats says invalid numbers', () => {
        expect(sum(2, 2)).toBe('invalid numbers');
    })
})



test('should match object with passed in object', () => {
    const data = {firstName: 'tony'};
    data['lastName'] = 'kim'
    
    expect(data).toEqual({firstName: 'tony', lastName: 'kim'});
})

test('should test if a value is null', () => {
    const thisIsNull = null;
    
    expect(thisIsNull).toBeNull();
    expect(thisIsNull).not.toBeTruthy();
})

test('should return a sum greater than 2', () => {
    expect(sum(2, 2)).toBeGreaterThan(2)
})

test('should expect string to contain word stop', () => {
    expect('stackoverflow').toMatch(/over/) //regex matching
})

test('should include the word cowboys in array', () => {
    const nflList = [
        'broncos',
        'chiefs',
        'cowboys',
        'eagles'
    ]
    expect(nflList).toContain('cowboys')
})

const shouldErrorOut = () => {
    throw new Error('you did something wrong'); //throw means it ends the function
}

test('should throw an error when invoked', () => {
    expect(() => shouldErrorOut()).toThrow(Error);  
    // This checks to see if an error is thrown && that the class of javascript Error is thrown
    // could also put a .not.toThrow()
})

test('should resolve to a value that says go broncos!', () => {
    return expect(Promise.resolve('go broncos!').resolves.toBe('go broncos!'))
    // resolves is for asynnc testing, return necessary for testing promises
})

test('should resolve to a value that says go mavs!', async () => {
    await expect(Promise.resolve('go mavs!').resolves.toBe('go mavs!'))
    // async await
})

test('should reject to an error value', async () => {
    await expect(Promise.reject(new Error('cowboys')).rejects.toThrow('cowboys'))
})

test('should return data from the fetch function', () => {
    return fetchData().then(data => {
        expect(data).toEqual({firstName: 'tony', lastName: 'kim'})
    })
})


//MOCK FUNCTIONS

test('should return undefined by default', () => {
    const mock = jest.fn()

    const result = mock('booo cowboys')

    expect(mock).toHaveBeenCalledWith('booo cowboys')
    //tests the parameters
})


const { MongoClient } = require('mongodb');

describe('insert transaction', () => {
    let connection;
    let db;

    //setup and kick up our database connection
    beforeAll(async () => {
        connection = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })

        db = await connection.db(process.env.DATABASE_NAME)
    })

    // tear down by closing off db server
    afterAll(async () => {
        await connection.close()
    })

    it('should insert a doc into collection', async () => {
       // retrieve the collection we want to add the new insert into
        const users = db.collection('users');

        //create a fake data to insert into the db.
        const mockUser = { _id: 'some-id', name: 'john'};

        // inserting the new user into the db more specifically the user collection
        await users.insertOne(mockUser);

        // check to ensure the user we added is in the database
        const insertedUser = await users.findOne({ _id: 'some-id'});

        // check to ensure that the intended inserted user matches what is shown in mongodb
        expect(insertedUser).toEqual(mockUser);
    })
})

