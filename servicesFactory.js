
module.exports = function ServicesFactory(pool) {
    async function counter() {
        try {
            let all_ = await pool.query('select * from users');
            return all_.rows.length;
        }
        catch (error) {
            console.log(error.stack)
        } finally {
            TypeError.captureStackTrace
        }
    }

    function testError(par1, par2) {
        if (par1 === undefined || par1 === "") {
            return "Oops, no name entered."
        } else if (par2 === undefined || par2 === "") {
            return "This person has already been greeted."
            
        } else if ((par2 === undefined || par2 === "") && (par1 === undefined || par1 === "")) {
            return "Oops, no language has been selected, please select a language."
        }
    }

    async function addUserOrUpdate(checked, par, greet_counter_) {

        let names = par.charAt(0).toUpperCase() + par.slice(1).toLowerCase()
        greet_counter_ = 1
        try {
            if ((names !== "" && names == undefined) && (checked !== "" && checked !== undefined)) {
                await pool.query(`
            with upsert as (update users set greet_counter=greet_counter+1 
            where names=$1 returning *)insert into users(names,greet_counter) 
            select $1,$2 where not exists(select * from upsert);
            `, [names, greet_counter_])
            }if (checked === "isixhosa") {
                return "Molo, " + names;
            }
            else if (checked === "english") {
                return "Hello, " + names
            }
            else if (checked === "portuguese") {
                return "Olá, " + names
            }
        } catch (error) {
            console.error(error)
        }

    }

    async function sqlReset(){
        await pool.query("drop table users");
        await pool.query("create table users(id serial primary key,names text not null ,greet_counter int not null)")
    }

    async function getCurrentName(namesReq, names__) {
             names__ = namesReq
        try {
            let results = await pool.query(`
            select names ,greet_counter from users where $1=$2`, [names__, namesReq])
            var ourGreetAndName = {}
            for (let index in results.rows) {
                if (results.rows[index].names === namesReq) {
                    ourGreetAndName['names'] = results.rows[index].names;
                    ourGreetAndName['greet_counter'] = results.rows[index].greet_counter;
                }
            }
            return ourGreetAndName
        } catch (error) {
            console.error(error);
        }
    }
    return {
        counter,
        addUserOrUpdate,
        themNames,
        themGreets,
        getCurrentName,
        sqlReset,
        testError
    }
}
