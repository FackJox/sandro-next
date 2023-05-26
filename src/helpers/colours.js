export const lerpColor = (color1, color2, t) => {
  const r = color1.r + t * (color2.r - color1.r)
  const g = color1.g + t * (color2.g - color1.g)
  const b = color1.b + t * (color2.b - color1.b)
  return { r, g, b }
}

export const hexToRgb = (hex) => ({
  r: (hex >> 16) & 255,
  g: (hex >> 8) & 255,
  b: hex & 255,
})

export const rgbToHex = (rgb) => (rgb.r << 16) | (rgb.g << 8) | rgb.b

export const animateFogColor = (startColor, endColor, duration, setFogColor) => {
    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const t = Math.min(elapsed / duration, 1)
      const lerpedColor = lerpColor(startColor, endColor, t)
      setFogColor(rgbToHex(lerpedColor))

      if (t < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }