import { Thead as DefaultThead, Text, Th, Tooltip, Tr } from "@chakra-ui/react";
import classNames from "classnames";

const Thead = ({ columns }: { columns: any[] }) => {
  return (
    <DefaultThead>
      <Tr>
        {columns.map((column) => (
          <Th
            key={column.key}
            className={classNames(["normal-case", "border-b border-primary-400", column.className])}
          >
            <div className="flex items-center gap-2">
              <Tooltip
                label={column.tooltip}
                isDisabled={column.tooltip == null}
                closeDelay={500}
              >
                <Text
                  fontSize="18px"
                  className={classNames({
                    "cursor-help": column.tooltip,
                  })}
                >
                  {column.hideText !== true && column.text}
                </Text>
              </Tooltip>
            </div>
          </Th>
        ))}
      </Tr>
    </DefaultThead>
  );
};

export default Thead;
