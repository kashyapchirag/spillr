import AuthForm from "@/components/AuthForm";
import ShapeGrid from "@/components/ShapeGrid";

const AuthPage = () => {
  return (
    <div className="cont relative w-full h-screen flex justify-center items-center bg-black">
      <div>
        <div className="shader absolute w-full h-full inset-0">
          <ShapeGrid
            speed={0.3}
            squareSize={40}
            direction="diagonal" // up, down, left, right, diagonal
            borderColor="#fff"
            hoverFillColor="#222"
            shape="square" // square, hexagon, circle, triangle
            hoverTrailAmount={0} // number of trailing hovered shapes (0 = no trail)
            direction="diagonal"
            borderColor="#271E37"
            hoverColor="#222222"
            size={40}
            shape="square"
          />
        </div>
      </div>

      <div className="box bg-transparent h-full w-full flex justify-center items-center">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
