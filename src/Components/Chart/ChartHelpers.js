let transString = transform =>
  `translate(${transform.translation.x} ${transform.translation.y}) scale(${
    transform.scale.width
  } ${transform.scale.height})`;

export { transString };
