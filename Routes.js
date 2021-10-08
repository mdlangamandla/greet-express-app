exports.Routes = Routes;
function Routes(servicesFactory) {
    const home = async (req, res) => {
        await servicesFactory.all();
        res.render("index", {
            counterDiv: await servicesFactory.all()
        });
    };

    const bulisa =  async (req, res) => {
            req.flash("error",await servicesFactory.testError(req.body.rdio, req.body.enter_name))
            res.render("index", {
                out_div: await servicesFactory.addUserOrUpdate(req.body.rdio, req.body.enter_name),
                counterDiv: await servicesFactory.all()
            }); 
        };

    const reset = async (req, res) => {
        await servicesFactory.sqlReset();
        res.redirect("/");
    };
    const greeted = async (req,res)=>{
        res.render("greeted", {
            output: await servicesFactory.themNames()
        })
    }
    const userGreeted = async (req, res) => {
        let themUsers = await servicesFactory.getCurrentName(req.params.userGreeted)
        res.render("UsersCounter", { names: themUsers['names'], bulisa: themUsers['greet_counter'] });
    };
    const action =async (req, res) => {
        res.render("index", { out_div})        
    }

    return {
        home,
       bulisa,
        reset,
        greeted,
        userGreeted,
        action
    };
}

