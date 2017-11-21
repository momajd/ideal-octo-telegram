# extend Ruby's Matrix class
# This needs to be 'auto-loaded' by Rails
require 'matrix'

class Matrix

  def []=(i, j, val)
    @rows[i][j] = val
  end

  def augment(arr)
    Matrix.columns(self.transpose.to_a << arr)
  end

  def swap_rows!(i1, i2)
    @rows[i1], @rows[i2] = @rows[i2], @rows[i1]
    self
  end

  def row_echelon_form
    duped = Matrix.rows(self.to_a)
    n_rows = duped.row_size
    n_cols = duped.column_size
    return nil unless n_cols == n_rows + 1

    n_rows.times do |i|
      # search for the maximum in this column
      max_el = duped[i, i].abs
      max_row = i

      ((i + 1)...n_rows).each do |k|
        if duped[k, i].abs > max_el
          max_el = duped[k, i].abs
          max_row = k
        end
      end

      #swap maximum row with current row (for stability/accuracy)
      duped.swap_rows!(i, max_row)

      # make all rows below this one 0 in the current column
      ((i + 1)...n_rows).each do |k|
        constant = -duped[k, i]/duped[i, i]
        (i...n_cols).each {|j| duped[k, j] += constant * duped[i, j]}
      end
    end
    duped
  end

  def gauss_jordan
    echelon = row_echelon_form
    results = []

    # solve for Ax = b
    (row_size - 1).downto(0) do |i|
      x = echelon[i, column_size - 1] / echelon[i, i]
      results.unshift(x)

      (i - 1).downto(0) do |k|
        echelon[k, column_size - 1] -= echelon[k, i] * x
      end
    end
    results
  end

end
