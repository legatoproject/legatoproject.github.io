echo "Cleaning..."
rm -rv out/*
echo "Running templater..."
python gen.py
echo "Copying..."
cp -Rv out/* ../
