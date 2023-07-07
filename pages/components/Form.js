export default function Form({selectGoal, goalSelectChange, egArray, selectTone, toneSelectChange, toneTypeArray, 
  keywordInput, keywordInputChange, maskInput, maskInputChange}) {
  return (
    <form>
      <div className="overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="font-semibold text-gray-500 leading-7">Add Generation Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Select more options for content generation.</p>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="keywords" className="block text-sm font-medium leading-6 text-gray-900">
                Keywords
              </label>
              <div className="mt-2">
                <input
                  id="keywords"
                  name="keywords"
                  type="keywords"
                  autoComplete="keywords"
                  value={keywordInput}
                  onChange={keywordInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="mask" className="block text-sm font-medium leading-6 text-gray-900">
                Mask
              </label>
              <div className="mt-2">
                <input
                  id="mask"
                  name="mask"
                  type="mask"
                  autoComplete="mask"
                  value={maskInput}
                  onChange={maskInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                Goal
              </label>
              <div className="mt-2">
                <select 
                  name="goal" 
                  id="goal-select" 
                  value={selectGoal}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={goalSelectChange}
                  >
                    <option value="">Choose a goal type</option>
                    {egArray?.map((eg, index) => {
                        return <option value={eg.value} key={index}>{eg.value}</option>
                      }
                    )}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="tone" className="block text-sm font-medium leading-6 text-gray-900">
                Tone
              </label>
              <div className="mt-2">
                <select 
                  name="tone" 
                  id="tone-select" 
                  value={selectTone}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={toneSelectChange}
                  >
                    <option value="">Choose a tone type</option>
                    {toneTypeArray?.map((eg, index) => {
                        return <option value={eg.value} key={index}>{eg.value}</option>
                      }
                    )}
                </select>
              </div>
            </div>


          </div>
        </div>
      </div>
    </form>
  )
}
