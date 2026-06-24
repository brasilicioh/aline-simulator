export default function SimFrame() {
  return (
    <div className="w-full h-screen max-h-screen bg-[#0D1117]">
      <div className="grid grid-cols-1 grid-rows-5 h-full">
        <div className="row-span-4 flex flex-col justify-center items-center">
          <div className="text-white h-8 flex items-center justify-center">
            <h2 className="font-semibold text-xl">Aline Simulator : --- Title template ---</h2>
          </div>
          <div className="h-[90%] w-[95%] border-black border-4 border-bs-gray-600 border-s-gray-600 flex items-center justify-center">
            <h3 className="text-white bg-blue-800 size-full">AlineSim$~ Connection Terminated ▋</h3>
          </div>
        </div>

        <div className="row-span-1 flex justify-center">
          <div className="grid grid-cols-3 gap-3 h-full w-[95%] py-1">
            <div className="bg-black rounded-xl border-white border-2">
              awda
            </div>
            <div className="bg-black rounded-xl border-white border-2">
              wad
            </div>
            <div className="bg-black rounded-xl border-white border-2">
              waw
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}