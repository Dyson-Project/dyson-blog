package org.dyson.blog

import java.math.BigDecimal
import java.math.RoundingMode

class CalcFutureValue

fun calcFutureValue(p: BigDecimal, r: BigDecimal, n: Int): BigDecimal {
    var rs = p
    repeat(n) { i ->
        var temp = rs * (BigDecimal.ONE.plus(r))
        println("""$i ${rs.setScale(3, RoundingMode.HALF_EVEN).toString().padStart(10)} ${r.toString().padStart(10)} ${temp.setScale(3, RoundingMode.HALF_EVEN).toString().padStart(10)}""")
        rs = temp
    }
    return rs
}

fun main() {
    var rs = calcFutureValue(BigDecimal.valueOf(30_000_000), BigDecimal.valueOf(0.00196), 12 * 5)
    println(rs)
}