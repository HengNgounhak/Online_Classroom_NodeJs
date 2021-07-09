gpa = 0

def valid(myInput):
    validOnly = ["YES", "Y", "NO", "N"]
    for x in validOnly:
        if myInput.upper() != x:
            isValid = False
        else:
            isValid = True
            break
    return isValid

def getGPA():
    try:
        gpa = int(input("what is your GPA:"))
    except:
        print("--- !!! Please input number of your GPA. ---")
        getGPA()

def program():
    applyTO = input("Do you wish to apply to study at Harvard University? (Yes or No):")
    if valid(applyTO):
        if applyTO.upper() != "YES" and applyTO.upper() != "Y":
            moreAns = input("Why not? :")
            print("Your answer:", moreAns)
            print("Ah I see")
        else:
            getGPA()
            if gpa >= 4:
                print("Your chance of being accepted by Havard is around 5%")
            else:
                print("Yor GPA is less than 4% so, your chance of being accepted by Harvard University is Zero")
                print("Hey! but don't be disappointed! just study harder to increase your chance. Good LucK!")
    else:
        print("\n---!!! Please input correctly (Yes or No)---\n")
        program()

program()

