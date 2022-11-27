import { COLORS, FONT_SIZE, THICKNESS } from "../constants/style";
import { HEIGHT_GRAPH, WIDTH_GRAPH } from "../constants/graph";
import getCoordGraph from "./getCoordGraph";
import getParamGraph from "./getParamGraph";

const drawRectangles = (ctx, getCoord, scale, step, params) => {
  const { start, end, precision, func, numberRectangles } = params;
  const widthRectangle = (end - start) / numberRectangles;

  const scaledWidthRectangle = widthRectangle * scale.x;

  ctx.fillStyle = COLORS.rectBackground;
  ctx.setLineDash([0, 0]);
  ctx.strokeStyle = COLORS.rectBorder;
  ctx.lineWidth = THICKNESS.rect;

  for (let i = 0; i < numberRectangles; i++) {
    const heightRectangle = func(start + widthRectangle * (i + 0.5));
    const { x, y } = getCoord(start + widthRectangle * i, 0);
    const scaledHeightRectangle = heightRectangle * scale.y;

    if (scaledWidthRectangle > THICKNESS.rect * 2) {
      ctx.fillRect(x, y, scaledWidthRectangle, scaledHeightRectangle);
    }
    ctx.strokeRect(x, y, scaledWidthRectangle, scaledHeightRectangle);
  }
};

const drawGraphFunction = (ctx, getCoord, scale, start, end, step) => {
  for (
    let i = start;
    i <= end;
    i += Math.max(step, THICKNESS.graph / (10 * scale.x))
  ) {
    const { x, y } = getCoord(i);
    ctx.fillStyle = COLORS.graph;
    ctx.fillRect(x, y, THICKNESS.graph, THICKNESS.graph);
  }
};

const drawLine = (ctx, coord, isHorizontal = true, custom) => {
  ctx.beginPath();

  ctx.lineWidth = THICKNESS.graph;
  ctx.strokeStyle = COLORS.axis;

  if (custom) {
    custom(ctx, coord, isHorizontal);
  }

  if (isHorizontal) {
    ctx.moveTo(0, coord);
    ctx.lineTo(WIDTH_GRAPH, coord);
  } else {
    ctx.moveTo(coord, 0);
    ctx.lineTo(coord, HEIGHT_GRAPH);
  }

  ctx.stroke();

  ctx.closePath();
};

const drawDashLine =
  (text, isStart = true) =>
  (ctx, coord) => {
    ctx.setLineDash([16, 6]);
    ctx.lineWidth = THICKNESS.normal;
    ctx.strokeStyle = ctx.fillStyle = COLORS.normal;
    ctx.font = `${FONT_SIZE.normal}px Computer Modern Serif`;
    let testCoord = coord;

    if (isStart) {
      ctx.textAlign = "end";
      testCoord -= FONT_SIZE.normal / 4;
    } else {
      ctx.textAlign = "start";
      testCoord += FONT_SIZE.normal / 4;
    }
    ctx.fillText(text, testCoord, HEIGHT_GRAPH - 1);
  };

const drawGraph = async (ref, params) => {
  const { start, end, func, numberRectangles } = params;

  const canvas = ref.current;
  if (!canvas || typeof func !== "function") return;

  const ctx = canvas.getContext("2d");

  // Clear Canvas
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, WIDTH_GRAPH, HEIGHT_GRAPH);

  // Get params
  const { scale, globalMin, globalMax, step } = getParamGraph(params);
  const getCoord = getCoordGraph({ globalMin, globalMax, scale, func });

  drawRectangles(ctx, getCoord, scale, step, params);

  // Draw axises
  const { x: startX, y: startY } = getCoord(0, 0);
  drawLine(ctx, startY); // X Axis
  drawLine(ctx, startX, false); // Y Axis

  drawGraphFunction(ctx, getCoord, scale, globalMin.x, globalMax.x, step);

  //Draw normal
  const { x: minX } = getCoord(start, 0);
  drawLine(ctx, minX, false, drawDashLine(start));

  if (start !== end) {
    const { x: maxX } = getCoord(end, 0);
    drawLine(ctx, maxX, false, drawDashLine(end, false));
  }
};

export default drawGraph;
