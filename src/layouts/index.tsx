import G6, { ModelConfig } from "@antv/g6";
import { NODE_NAME_CARD } from "@/constants";
import { Rect, createNodeFromReact, Text, Group } from "@antv/g6-react-node";

const Tag = ({
  text,
  color,
  width,
}: {
  text: string;
  color: string;
  width: number;
}) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width,
      radius: [4],
      margin: [0, 4],
    }}
  >
    <Text style={{ fill: "#fff", fontSize: 8 }}>{text}</Text>
  </Rect>
);

const Card = ({ cfg }: { cfg: ModelConfig }) => {
  const size = (cfg?.size ?? [0, 0]) as [number, number];
  const fill = cfg?.style?.fill ?? "#fff";
  const stroke = cfg?.style?.stroke ?? "#fff";
  const label = cfg?.label ?? "";
  const data = (cfg?.data ?? []) as number[];

  return (
    <Rect
      style={{
        width: size[0],
        height: size[1],
        fill,
        stroke,
      }}
    >
      <Text style={{ fill: "#000" }}>{label}</Text>
      {data.map((row: any, index) => {
        const rectWidth = 100;
        return (
          <Group key={index}>
            <Rect
              style={{
                width: rectWidth,
                height: 30,
                flexDirection: "row",
              }}
            >
              <Tag
                color="#66ccff"
                text={row?.name ?? ""}
                width={rectWidth / 2}
              />
              <Tag
                color="#66ccff"
                text={row?.value ?? ""}
                width={rectWidth / 2}
              />
            </Rect>
          </Group>
        );
      })}
    </Rect>
  );
};

G6.registerNode(NODE_NAME_CARD, createNodeFromReact(Card));
