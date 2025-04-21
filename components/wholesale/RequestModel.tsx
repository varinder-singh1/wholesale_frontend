<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
<div className="bg-white w-full max-w-2xl rounded-lg p-6">
  <h2 className="text-xl font-bold mb-4">Fix Rejected Fields</h2>
  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    {rejectedFields.map((field) => (
      <div key={field.name}>
        <label className="block font-medium text-sm mb-1">
          {labelMap[field.name]}
        </label>
        <input
          type="text"
          value={formValues[field.name]}
          onChange={(e) =>
            handleChange(field.name, e.target.value)
          }
          className="w-full border px-3 py-2 rounded"
        />
        <p className="text-xs text-red-500 mt-1 italic">
          Reason: {field.reason}
        </p>
      </div>
    ))}
  </div>

  <div className="flex justify-end mt-6 gap-3">
    <button
      onClick={() => setShowModal(false)}
      className="px-4 py-2 border rounded hover:bg-gray-100"
    >
      Cancel
    </button>
    <button
      onClick={handleSubmit}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Submit Corrections
    </button>
  </div>
</div>
</div>