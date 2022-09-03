import classNames from 'classnames';

type CardEmptyPlayerProps = {
  className?: string;
};

export function CardEmptyPlayer(props: CardEmptyPlayerProps) {
  return (
    <div
      className={classNames(
        'flex h-[3.75rem] w-full flex-row bg-white transition delay-150 ease-in-out mb-4', 
        props.className)
      }
    >
      <div>
        <img
          src="/assets/img/EmptyPlayerImg.svg"
          alt=""
          className="mr-4 h-full"
        />
      </div>
      <div className=" w-full"></div>
      <div className="w-2  bg-blue-gray-default"></div>
    </div>
  );
}
