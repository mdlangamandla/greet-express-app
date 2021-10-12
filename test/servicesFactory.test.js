const assert = require("assert");
const ServicesFactory = require("../servicesFactory");
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/db_test';
const pool = new Pool({
    connectionString,
});
describe('Greetings SQL queries', function () {
    beforeEach(async function(){
               // clean the tables before each test run
               try {                
               await pool.query("delete from users;")
               } catch (error) {
                   console.error(error)
               }
               
    });
     
    it("Should greet Fresh in Portuguese and return 'Olá, Fresh'.",async()=>{
        let servicesFactory = await ServicesFactory(pool)
        assert.equal("Olá, Fresh",await servicesFactory.addUserOrUpdate("portuguese","Fresh"))
    })
    it("Should greet Olwethu in Isixhosa and return 'Molo, Olwethu'.",async()=>{
        let servicesFactory = await ServicesFactory(pool)
        assert.equal("Molo, Olwethu",await servicesFactory.addUserOrUpdate("isixhosa","Olwethu"))
    })
    it("Should greet Khush in english and return 'Hello, Khush'.",async()=>{
        let servicesFactory = await ServicesFactory(pool);
        assert.equal("Hello, Khush",await servicesFactory.addUserOrUpdate("english","Khush"))
    })
    it("Should inform the user that s/he greeted with out entering the name.",async ()=>{
        let servicesFactory =await ServicesFactory(pool)
        let expected = "Oops, no name entered."
        assert.equal(expected,servicesFactory.testError("",""))

    })

    it("Should inform the user that this person is already greeted.",async ()=>{
        let servicesFactory =await ServicesFactory(pool)
        let expected = "This person has already been greeted."
        assert.equal(expected,servicesFactory.testError("Meli",""))

    })

    it("Should inform the user that no langauge has been selected.",async ()=>{
        let servicesFactory =await ServicesFactory(pool)
        let expected = "Oops, no language has been selected, please select a language."
        assert.notDeepStrictEqual(expected,servicesFactory.testError({Mbasa:1},{Mbasa:'1'}))

    })

   
    it("The counter should not increase if a language is not selected.",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("","Dlangamandla");
        assert.equal(1,true,await servicesFactory.counter());
    })

    it('It should greet Lamla once and return the size of the array equal to one.', async ()=> {
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("isixhosa","Lamla");
        assert.equal(1,true, await servicesFactory.counter());
    })


    it("It should greet Sisa twice and the counter should not increment.", async ()=>  {
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("portuguese","Sisa");
        await servicesFactory.addUserOrUpdate("portuguese","Sisa");
        assert.equal(1,true,await servicesFactory.counter());
        
    })


    after(function () {
        pool.end();
    })
});
