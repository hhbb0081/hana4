import { MyProps } from "../types/props";

function My({ session, isLogined, logout, login }: MyProps) {
  const { loginUser, cart } = session;
  return (
    <>
      <span>{loginUser?.name} Logined</span>
      {loginUser ? (
        <div>
          <span onClick={logout}>Log Out</span>
        </div>
      ) : (
        <div>
          <span onClick={() => login({ id: 123, name: "문해빈" })}>Log In</span>
        </div>
      )}
      <ul>
        {cart.map(({ id, name, price }) => (
          // key는 fiber가 인식할 수 있어야하기 때문에 필수
          // key를 index로 하면 안되는 이유: 데이터가 삭제되거나 추가되면 idx가 바뀌어서 fiber가 제대로 인식하지 못함
          <li key={id}>
            <span>{name}</span>
            <span>{price}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default My;
