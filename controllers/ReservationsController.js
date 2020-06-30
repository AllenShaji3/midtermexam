// You need to complete this controller with the required 7 actions
const viewPath = 'reservations';
const Reservation = require('../models/reservation');
const User = require('../models/user');
const reservation = require('../models/reservation');



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
exports.show = async (req, res)=> {
try {
    const reservation = await (await Reservation.findById(req.params.id)).populate('user');
    res.render(`${viewPath}/show`, {
        pageTitle: "Reservation",
        reservation:reservation
    });
} catch (error){
req.flash('There was an error showing the reservation');
res.redirect('/');
}

};
exports.edit = async (req, res)=> {
    try {
        const reservation = await reservation.findById(req.params.id);
        res.render(`${viewPath}/edit`,{pageTitle: "Editing",
    formData: reservation});
    } catch(error){
        req.flash('There was an error editing the reservation');
        res.redirect('/'); 
    }


}
exports.delete = async (req, res)=> {
    try {
        await reservation.deleteOne({_id: req.body.id});
        req.flash('Successfully deleted');
res.redirect('/reservations');
    }catch(error) {
        req.flash('There was an error deleting the reservation');
res.redirect('/reservations');
    }

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
        req.flash(`There was an error creating this reservation - ${error}`);
        req.session.formData = req.body;
        console.log(error);
        res.redirect('/reservations/new');
    }

}
exports.update = (req, res)=> {
try {
    const {user:email} = req.session.passport;
    const user = await User.findOne({email:email});

    let reservation = await Reservation.findById(req.body.id);
    if (!reservation) throw new Error('Reservation could not be found');

    const attributes = {user: user._id, ...req.body};
    await Reservation.validate(attributes);
    await Reservation.findByIdAndUpdate(attributes.id, attributes);

    req.flash('The reservation was updated successfully');
    res.redirect(`/reservations/${req.body.id}`);
  } catch (error) {
    req.flash(`There was an error updating this reservation: ${error}`);
    res.redirect(`/reservations/${req.body.id}/edit`);

}
}