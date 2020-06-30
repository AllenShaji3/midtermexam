// You need to complete this controller with the required 7 actions
const viewPath = 'reservations';
const Reservation = require('../models/reservation');
const User = require('../models/user');



exports.index =async (req, res)=> {
try {
    const reservations = await Reservation
    .find()
    .populate('user')
    .sort({updatedAt: 'desc'});


res.render(`${viewPath}/index`, 
{pageTitle: 'Index',
reservations : reservations
});
} catch (error) {
    req.flash('danger', `There was an error displaying the index -  ${error}`);
    res.redirect('/');
  }

};
exports.show = (req, res)=> {

}
exports.edit = (req, res)=> {

}
exports.delete = (req, res)=> {

}
exports.new = (req, res)=> {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Reservation'
        
});
}
exports.create = async (req, res)=> {
    try{
const{ user: email} = req.session.passport;
const user = await User.findOne({email: email});
const reservation = await Reservation.create({user:user._id, ...req.body});
req.flash('Successfully reservation created.');
res.redirect(  `/reservations/${reservation.id}`);

    }catch(error){
        req.flash(`There was an error creating this blog - ${error}`);
        req.session.formData = req.body;
        console.log(error);
        res.redirect('/reservations/new');
    }

}
exports.update = (req, res)=> {

}