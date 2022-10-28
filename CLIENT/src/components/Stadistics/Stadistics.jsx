import React, { useEffect } from 'react';
import { getSellsHistory } from "../../redux/actions/index.js"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SellsGraphic from "../SellsGraphic/SellsGraphic.jsx"

const Stadistics = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSellsHistory())
    }, [dispatch])

    const sellsHistory = useSelector(state => state.sellsHistory)

    const listNumbers = (num) => {
        let numbers = [];
        for (let i = 1; i <= num; i++) {
            numbers.push(i.toString())
        }
        return numbers;
    }

    const daysMonth = () => {
        const thisMonth = Date().split(" ")[1]
        const thirtyDays = ["Abr", "Jun", "Sep", "Nov"]
        const thirtyOneDays = ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"]
        let daysOfThisMonth = [];
        if (thirtyDays.includes(thisMonth)) {
            daysOfThisMonth = listNumbers(30)
        } else if (thirtyOneDays.includes(thisMonth)) {
            daysOfThisMonth = listNumbers(31)
        } else {
            daysOfThisMonth = listNumbers(28)
        }
        return daysOfThisMonth
    }

    const sellsForDays = () => {
        const today = new Date()
        const thisMonth = today.getMonth() + 1
        const thisYear = today.getFullYear()
        const daysOfMonth = parseInt(daysMonth().pop())
        let sellsDays = []
        let day = 0
        if (sellsHistory.length) {
            for (let i = 1; i <= daysOfMonth; i++) {
                let amount = 0
                if (i < 10) {
                    day = `0${i}`
                } else {
                    day = i
                }
                sellsHistory.forEach(sell => {
                    if (sell.date === `${day}/${thisMonth}/${thisYear}`) {
                        amount += 1
                    }
                })
                sellsDays.push(amount.toString())
            }
        }
        return sellsDays
    }

    const randomSells = () => {
        let randomSell = Math.floor(Math.random() * 10)
        return randomSell
    }

    const sellsInProcess = () => {
        let auxSells = []
        const auxNum = parseInt(daysMonth().pop()) //ultimo día del mes (osea, la cantidad de días)
        for (let i = 1; i <= auxNum; i++) {
            auxSells.push(randomSells())
        }
        return auxSells
    }

    const mostSellProducts = () => {
        if (!sellsHistory.length) return []
        let products = []
        sellsHistory.forEach(sell => {
            let product = products.find(s => s.productId === sell.productId)
            if (!product) {
                products.push({productId: sell.productId, amount: 1})
            } else {
                let num = product.amount + 1
                product.amount = num
            }
        })
        const orderedSells = products.sort((a, b) => { return b.amount - a.amount })
        if (orderedSells.length <= 5) {
            return orderedSells
        }
        return orderedSells.slice(0, 5)
    }

    const mostSelledProducts = mostSellProducts()
    const days = daysMonth()
    const sells = sellsHistory.lentgh ? sellsForDays() : sellsInProcess()

    return (
        <div>
            <h1>Panel de Control</h1>
            <div>
                <SellsGraphic 
                    days={days}
                    sells={sells}
                />
                {
                    sellsHistory.length ? sellsHistory.map(sell => {
                        return (
                            <div>
                                <img src={sell.img} alt="foto" />
                                <h4>{sell.name}</h4>
                                <p>{sell.buyer}</p>
                                <p>{sell.location}</p>
                                <Link to={`/sell/${sell.id}`}>
                                    <p>Más detalles de la compra</p>
                                </Link>
                            </div>
                        )
                    }) : <h2>Aquí van a aparecer las ventas que hayas realizado</h2>
                }
                <div>
                    <h2>Productos más vendidos</h2>
                    {
                        mostSelledProducts.length ? mostSelledProducts.map(s => {
                            return (
                                <div>
                                    <h2>{s.productId}</h2>
                                </div>
                            )
                        }) : <div>Aquí se mostraran tus productos más vendidos</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Stadistics;