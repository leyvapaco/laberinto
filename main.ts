radio.onReceivedNumber(function (receivedNumber) {
    Avanza()
})
function Mayor () {
    max = lista[0]
    mejorGiro = 0
    if (lista[1] >= max) {
        max = lista[1]
    }
    if (lista[2] >= max) {
        max = lista[2]
    }
    if (lista[3] >= max) {
        max = lista[3]
    }
    if (lista[4] >= max) {
        max = lista[4]
    }
    if (lista[5] >= max) {
        max = lista[5]
    }
    if (lista[6] >= max) {
        max = lista[6]
    }
    if (lista[7] >= max) {
        max = lista[7]
    }
    if (lista[8] >= max) {
        max = lista[8]
    }
    mejorGiro = lista.indexOf(max)
    basic.showNumber(mejorGiro)
    radio.sendNumber(mejorGiro)
    basic.pause(500)
    radio.sendNumber(0)
    music.playTone(784, music.beat(BeatFraction.Double))
}
function Avanza () {
    d1 = Math.trunc(maqueen.Ultrasonic(PingUnit.Centimeters))
    while (true) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
        while (d1 >= 7) {
            basic.pause(100)
            d1 = Math.trunc(maqueen.Ultrasonic(PingUnit.Centimeters))
        }
        maqueen.motorStop(maqueen.Motors.All)
        radio.sendNumber(0)
        Escanea()
        d1 = Math.trunc(maqueen.Ultrasonic(PingUnit.Centimeters))
    }
}
input.onButtonPressed(Button.A, function () {
    Avanza()
})
function Escanea () {
    basic.clearScreen()
    giraDcha()
    distancia = Math.trunc(maqueen.Ultrasonic(PingUnit.Centimeters))
    basic.showNumber(distancia)
    lista = []
    lista.push(distancia)
    radio.sendNumber(distancia)
    basic.pause(200)
    for (let index = 0; index <= 6; index++) {
        giraDcha()
        distancia = Math.trunc(maqueen.Ultrasonic(PingUnit.Centimeters))
        if (index >= 2 && index <= 3) {
            distancia += -100
        }
        lista.push(distancia)
        radio.sendNumber(distancia)
        basic.pause(200)
    }
    radio.sendNumber(0)
    Mayor()
    for (let index = 0; index < 7 - mejorGiro; index++) {
        giraIzda()
    }
}
function giraIzda () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 160)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 160)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
    music.playTone(262, music.beat(BeatFraction.Eighth))
}
function giraDcha () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 160)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 160)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
    music.playTone(247, music.beat(BeatFraction.Eighth))
}
function rectifica () {
    giraIzda()
    d1 = maqueen.Ultrasonic(PingUnit.Centimeters)
    giraDcha()
    giraDcha()
    d2 = maqueen.Ultrasonic(PingUnit.Centimeters)
    giraIzda()
    if (d2 - d1 > 0) {
        giraDcha()
    } else {
        giraIzda()
    }
}
let d2 = 0
let distancia = 0
let d1 = 0
let mejorGiro = 0
let lista: number[] = []
let max = 0
radio.setGroup(13)
