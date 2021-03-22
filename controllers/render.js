const { convertLocations } = require("../models/places");

function getHome(req, res) {
    const result = "";

    res.render("pages/home", {
        result,
    });
}

async function postHome(req, res) {
    const fromInputValue = req.body.from;
    const toInputValue = req.body.to;
    const dateInputValue = req.body.date;

    res.setHeader("Set-Cookie", [
        `fromInput=${fromInputValue}`,
        `toInput=${toInputValue}`,
        `dateInput=${dateInputValue}`,
    ]);

    const result = await convertLocations(
        fromInputValue,
        toInputValue,
        dateInputValue
    );

    res.render("pages/home", {
        result,
    });
}

function getCheckout(req, res) {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput,
    });
}

function postCheckout(req, res) {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    const ticketPrice = req.body.price;
    const ticketAirline = req.body.airline;
    const ticketDepTime = req.body.time;

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput,
        ticketPrice,
        ticketAirline,
        ticketDepTime
    });
}

function getOffline(req, res) {
    res.render("pages/offline");
}

function getConfirmation(req, res) {
    res.render("pages/confirmation");
}

function postConfirmation(req, res) {
    const name = req.body.name;
    res.render("pages/confirmation", {
        name
    });
}

function get404(req, res) {
    res.render("pages/404");
}

module.exports = { getHome, postHome, getCheckout, postCheckout, getOffline, getConfirmation, postConfirmation, get404 };
